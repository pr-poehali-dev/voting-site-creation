"""
Business: API для управления голосованиями (создание, получение списка, голосование)
Args: event с httpMethod, body, queryStringParameters; context с request_id
Returns: HTTP response с данными голосований
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def get_db_connection():
    """Подключение к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # GET - получить все голосования
        if method == 'GET':
            cursor.execute("""
                SELECT 
                    p.id, p.title, p.description, p.is_active, 
                    p.end_date, p.created_at, p.creator_id,
                    u.name as creator_name,
                    (SELECT COUNT(*) FROM votes WHERE poll_id = p.id) as total_votes
                FROM polls p
                LEFT JOIN users u ON p.creator_id = u.id
                ORDER BY p.created_at DESC
            """)
            
            polls = cursor.fetchall()
            result = []
            
            for poll in polls:
                # Получаем варианты ответов
                cursor.execute("""
                    SELECT id, text, votes_count as votes
                    FROM poll_options
                    WHERE poll_id = %s
                    ORDER BY id
                """, (poll['id'],))
                
                options = cursor.fetchall()
                
                result.append({
                    'id': str(poll['id']),
                    'title': poll['title'],
                    'description': poll['description'],
                    'options': [
                        {'id': str(opt['id']), 'text': opt['text'], 'votes': opt['votes']}
                        for opt in options
                    ],
                    'totalVotes': poll['total_votes'],
                    'isActive': poll['is_active'],
                    'endDate': poll['end_date'].isoformat() if poll['end_date'] else None,
                    'creatorName': poll['creator_name']
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'polls': result})
            }
        
        # POST - создать голосование или проголосовать
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            # Создание голосования
            if action == 'create':
                title = body_data.get('title')
                description = body_data.get('description')
                options = body_data.get('options', [])
                end_date = body_data.get('endDate')
                user_id = body_data.get('userId')
                
                # Вставляем голосование
                cursor.execute("""
                    INSERT INTO polls (title, description, creator_id, end_date)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                """, (title, description, user_id, end_date))
                
                poll_id = cursor.fetchone()['id']
                
                # Вставляем варианты ответов
                for option_text in options:
                    cursor.execute("""
                        INSERT INTO poll_options (poll_id, text)
                        VALUES (%s, %s)
                    """, (poll_id, option_text))
                
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'pollId': poll_id})
                }
            
            # Голосование
            elif action == 'vote':
                poll_id = body_data.get('pollId')
                option_id = body_data.get('optionId')
                user_id = body_data.get('userId')
                
                # Проверяем, не голосовал ли уже
                cursor.execute("""
                    SELECT id FROM votes WHERE poll_id = %s AND user_id = %s
                """, (poll_id, user_id))
                
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Already voted'})
                    }
                
                # Добавляем голос
                cursor.execute("""
                    INSERT INTO votes (poll_id, user_id, option_id)
                    VALUES (%s, %s, %s)
                """, (poll_id, user_id, option_id))
                
                # Увеличиваем счетчик
                cursor.execute("""
                    UPDATE poll_options
                    SET votes_count = votes_count + 1
                    WHERE id = %s
                """, (option_id,))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True})
                }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    finally:
        cursor.close()
        conn.close()
