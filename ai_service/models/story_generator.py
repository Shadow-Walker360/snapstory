import tensorflow as tf
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os
from typing import Optional

class StoryGenerator:
    def __init__(self):
        self.model: Optional[GPT2LMHeadModel] = None
        self.tokenizer: Optional[GPT2Tokenizer] = None
        self.model_loaded = False

    def load_model(self):
        """Load the pre-trained GPT-2 model and tokenizer"""
        try:
            self.tokenizer = GPT2Tokenizer.from_pretrained('gpt2-medium')
            self.model = GPT2LMHeadModel.from_pretrained('gpt2-medium')
            self.model_loaded = True
            print("AI model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def generate_story(self, prompt: str, max_length: int = 200) -> str:
        """
        Generate a story based on the given prompt
        Args:
            prompt: The starting text for story generation
            max_length: Maximum length of generated text
        Returns:
            Generated story text
        """
        if not self.model_loaded:
            self.load_model()

        try:
            inputs = self.tokenizer.encode(prompt, return_tensors='pt')
            outputs = self.model.generate(
                inputs,
                max_length=max_length,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=0.7
            )
            return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        except Exception as e:
            print(f"Error generating story: {str(e)}")
            raise

# Singleton instance
story_generator = StoryGenerator()