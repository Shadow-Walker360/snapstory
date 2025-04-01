from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.story_generator import story_generator

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the AI model when the app starts
@app.before_first_request
def initialize_model():
    try:
        story_generator.load_model()
    except Exception as e:
        app.logger.error(f"Failed to initialize AI model: {str(e)}")

@app.route('/api/v1/generate', methods=['POST'])
def generate_story():
    """Endpoint for generating stories using AI"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        max_length = min(int(data.get('max_length', 200)), 1000)  # Limit to 1000 chars
        
        if not prompt:
            return jsonify({
                'success': False,
                'error': 'Prompt is required'
            }), 400
            
        generated_text = story_generator.generate_story(prompt, max_length)
        
        return jsonify({
            'success': True,
            'data': generated_text
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/v1/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    status = 'healthy' if story_generator.model_loaded else 'model not loaded'
    return jsonify({
        'status': status,
        'service': 'snapstory-ai',
        'model_loaded': story_generator.model_loaded
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
