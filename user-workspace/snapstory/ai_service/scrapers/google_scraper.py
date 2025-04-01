from .base_scraper import BaseScraper, ScrapedContent
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
from typing import List
import re

class GoogleScraper(BaseScraper):
    SEARCH_URL = "https://www.google.com/search?q={query}&num=10"
    CONTENT_CLEANUP = re.compile(r'[^\w\s.,!?\-]')

    def scrape(self, query: str) -> List[ScrapedContent]:
        search_url = self.SEARCH_URL.format(query=quote_plus(query))
        html = self.fetch_page(search_url)
        if not html:
            return []
        return self.parse_content(html)

    def parse_content(self, html: str) -> List[ScrapedContent]:
        soup = BeautifulSoup(html, 'html.parser')
        results = []
        
        # Extract search results
        for result in soup.select('div.g'):
            title_elem = result.select_one('h3')
            link_elem = result.select_one('a[href^="/url?"]')
            desc_elem = result.select_one('div.IsZvec')
            
            if not (title_elem and link_elem):
                continue
                
            # Extract actual URL from Google's tracking link
            href = link_elem['href']
            if href.startswith('/url?'):
                href = href.split('&')[0].replace('/url?q=', '')
                
            title = self._clean_text(title_elem.text)
            description = self._clean_text(desc_elem.text) if desc_elem else ""
            
            results.append(ScrapedContent(
                title=title,
                content=description,
                source="google",
                url=href
            ))
            
        return results

    def _clean_text(self, text: str) -> str:
        """Clean and normalize text content"""
        text = self.CONTENT_CLEANUP.sub(' ', text)
        return ' '.join(text.split()).strip()