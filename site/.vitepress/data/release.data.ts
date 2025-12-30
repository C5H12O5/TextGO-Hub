export default {
  async load() {
    try {
      const response = await fetch('https://api.github.com/repos/C5H12O5/TextGO/releases/latest');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        version: data.tag_name,
        url: data.html_url,
        name: data.name
      };
    } catch (error) {
      console.error('Failed to fetch latest release:', error);
      return {
        version: 'Latest',
        url: 'https://github.com/C5H12O5/TextGO/releases/latest',
        name: 'Latest Release'
      };
    }
  }
};
