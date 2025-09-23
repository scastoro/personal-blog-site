<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
  
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/rss">
    <html>
      <head>
        <title><xsl:value-of select="channel/title"/> RSS Feed</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
            color: #374151;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 1.1em;
          }
          .info-box {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .info-box h2 {
            color: #1f2937;
            margin-top: 0;
          }
          .feed-url {
            background: #f3f4f6;
            padding: 10px;
            border-radius: 6px;
            font-family: monospace;
            word-break: break-all;
            margin-top: 10px;
          }
          .items {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .item {
            border-bottom: 1px solid #e5e7eb;
            padding: 20px;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item h3 {
            margin: 0 0 10px 0;
            color: #1f2937;
          }
          .item h3 a {
            text-decoration: none;
            color: inherit;
          }
          .item h3 a:hover {
            color: #667eea;
          }
          .item-meta {
            font-size: 0.9em;
            color: #6b7280;
            margin-bottom: 10px;
          }
          .item-description {
            color: #4b5563;
          }
          .categories {
            margin-top: 10px;
          }
          .category {
            display: inline-block;
            background: #eff6ff;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-right: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1><xsl:value-of select="channel/title"/></h1>
          <p><xsl:value-of select="channel/description"/></p>
        </div>
        
        <div class="info-box">
          <h2>📡 RSS Feed</h2>
          <p>This is an RSS feed. RSS feeds allow you to stay up to date with new posts from this blog. To subscribe, copy the URL below and paste it into your favorite RSS reader.</p>
          <div class="feed-url">
            <xsl:value-of select="channel/atom:link[@rel='self']/@href"/>
          </div>
        </div>
        
        <div class="items">
          <xsl:for-each select="channel/item">
            <div class="item">
              <h3><a href="{link}"><xsl:value-of select="title"/></a></h3>
              <div class="item-meta">
                Published: <xsl:value-of select="substring(pubDate, 1, 16)"/>
                <xsl:if test="dc:creator"> • By <xsl:value-of select="dc:creator"/></xsl:if>
              </div>
              <div class="item-description">
                <xsl:value-of select="description"/>
              </div>
              <xsl:if test="category">
                <div class="categories">
                  <xsl:for-each select="category">
                    <span class="category"><xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>