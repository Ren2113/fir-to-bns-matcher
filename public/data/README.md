
# BNS Data Directory

This directory contains the BNS (Bharatiya Nyaya Sanhita) sections data used by the application.

## Files:

- `output.json`: Contains the BNS sections with their IDs, titles, and content.

## Data Format:

The `output.json` file should follow this format:

```json
{
  "sections": [
    {
      "id": "bns-101",
      "title": "BNS Section 101: Example Section",
      "content": "This is the content of section 101..."
    },
    {
      "id": "bns-102",
      "title": "BNS Section 102: Another Example",
      "content": "This is the content of section 102..."
    }
    // More sections...
  ]
}
```

To add your BNS data:
1. Create a file named `output.json` in this directory
2. Structure your data according to the format above
3. The application will automatically load and process this data
