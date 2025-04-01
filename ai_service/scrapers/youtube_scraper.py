from .base_scraper import BaseScraper, ScrapedContent
from typing import List, Optional
import re
from urllib.parse import urlparse, parse_qs
import requests

class YouTubeScraper(BaseScraper):
    SEARCH_URL = "https://www.youtube.com/results?search_query={query}"
    VIDEO_URL = "https://www.youtube.com/watch?v={id}"
    API_URL = "https://www.youtube.com/youtubei/v1/next?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
    
    def __init__(self):
        super().__init__()
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def scrape(self, query: str) -> List[ScrapedContent]:
        search_url = self.SEARCH_URL.format(query=query.replace(" ", "+"))
        html = self.fetch_page(search_url)
        if not html:
            return []
            
        video_ids = self._extract_video_ids(html)
        return self._get_video_details(video_ids[:5])  # Limit to 5 videos

    def _extract_video_ids(self, html: str) -> List[str]:
        """Extract video IDs from search results page"""
        pattern = r'"videoId":"([a-zA-Z0-9_-]{11})"'
        return list(set(re.findall(pattern, html)))

    def _get_video_details(self, video_ids: List[str]) -> List[ScrapedContent]:
        """Get details for multiple videos"""
        results = []
        for video_id in video_ids:
            if details := self._get_single_video_details(video_id):
                results.append(details)
        return results

    def _get_single_video_details(self, video_id: str) -> Optional[ScrapedContent]:
        """Get details for a single video"""
        try:
            # Get initial video page to extract API tokens
            video_url = self.VIDEO_URL.format(id=video_id)
            html = self.fetch_page(video_url)
            if not html:
                return None

            # Extract video title and description
            title = self._extract_title(html)
            description = self._extract_description(html)
            
            # Try to get transcript
            transcript = self._get_video_transcript(video_id)
            full_content = description + "\n\n" + transcript if transcript else description
            
            return ScrapedContent(
                title=title,
                content=full_content,
                source="youtube",
                url=video_url,
                metadata={
                    'video_id': video_id,
                    'platform': 'youtube',
                    'has_transcript': transcript is not None
                }
            )
        except Exception as e:
            self.logger.error(f"Error scraping YouTube video {video_id}: {str(e)}")
            return None

    def _extract_title(self, html: str) -> str:
        """Extract video title from HTML"""
        title_match = re.search(r'"title":"(.*?)"', html)
        return title_match.group(1) if title_match else "Untitled"

    def _extract_description(self, html: str) -> str:
        """Extract video description from HTML"""
        desc_match = re.search(r'"description":{"simpleText":"(.*?)"}', html)
        if desc_match:
            return desc_match.group(1)
        
        # Fallback to short description
        short_desc_match = re.search(r'"shortDescription":"(.*?)"', html)
        return short_desc_match.group(1) if short_desc_match else "No description available"

    def _get_video_transcript(self, video_id: str) -> Optional[str]:
        """Get video transcript using YouTube's API"""
        try:
            transcript_url = f"https://www.youtube.com/api/timedtext?v={video_id}&lang=en"
            response = self.session.get(transcript_url)
            response.raise_for_status()
            
            # Parse XML transcript
            transcript_text = []
            for line in re.findall(r'<text start="[^"]+" dur="[^"]+">([^<]+)</text>', response.text):
                transcript_text.append(line)
            
            return " ".join(transcript_text) if transcript_text else None
        except Exception as e:
            self.logger.warning(f"Could not fetch transcript for video {video_id}: {str(e)}")
            return None
