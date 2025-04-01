import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
from dataclasses import dataclass
import logging

@dataclass
class ScrapedContent:
    title: str
    content: str
    source: str
    url: str
    metadata: Dict = None

class BaseScraper:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def fetch_page(self, url: str) -> Optional[str]:
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            self.logger.error(f"Error fetching {url}: {str(e)}")
            return None

    def parse_content(self, html: str) -> List[ScrapedContent]:
        raise NotImplementedError("Subclasses must implement parse_content")

    def scrape(self, query: str) -> List[ScrapedContent]:
        raise NotImplementedError("Subclasses must implement scrape")