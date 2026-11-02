#!/usr/bin/env python3
"""Regenerate the controlled vision PDF from its editable Markdown source."""
from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'rexmi_vision.pdf'
FONT = Path('/usr/share/fonts/truetype/dejavu')
for name, file in [('Vision','DejaVuSans.ttf'),('VisionBold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('Vision',normal='Vision',bold='VisionBold')
INK=colors.HexColor('#132939'); TEAL=colors.HexColor('#007E87'); GRAY=colors.HexColor('#51616B')
styles={
 'h1':ParagraphStyle('h1',fontName='VisionBold',fontSize=23,leading=28,textColor=INK,spaceAfter=12),
 'h2':ParagraphStyle('h2',fontName='VisionBold',fontSize=11,leading=14,textColor=TEAL,spaceBefore=10,spaceAfter=5,keepWithNext=True),
 'body':ParagraphStyle('body',fontName='Vision',fontSize=9.0,leading=12.5,textColor=INK,spaceAfter=7),
 'table':ParagraphStyle('table',fontName='Vision',fontSize=8.3,leading=11,textColor=INK),
 'small':ParagraphStyle('small',fontName='Vision',fontSize=7.3,leading=10,textColor=GRAY,spaceAfter=4),
}

def markup(text):
    text=escape(text)
    text=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',text)
    text=re.sub(r'(https://[^\s;]+)',r'<link href="\1" color="#007E87">\1</link>',text)
    return text

def footer(c,doc):
    w,h=A4
    c.setStrokeColor(TEAL); c.setLineWidth(2); c.line(42,h-31,w-42,h-31)
    c.setFont('VisionBold',7); c.setFillColor(GRAY)
    c.drawString(42,26,'FARFIELD ROBOTICS  /  REXMI VISION  /  v1.0  /  2026-10-29')
    c.drawRightString(w-42,26,str(doc.page))

def main():
    lines=(ROOT/'docs/rexmi_vision.md').read_text().splitlines()
    story=[]; i=0
    while i<len(lines):
        line=lines[i].strip()
        if not line: i+=1; continue
        if line=='<!-- PAGEBREAK -->': story.append(PageBreak()); i+=1; continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                row=[s.strip() for s in lines[i].strip('|').split('|')]
                if not all(re.fullmatch(r'[-: ]+',s) for s in row): rows.append(row)
                i+=1
            data=[[Paragraph(markup(s),styles['table']) for s in row] for row in rows]
            table=Table(data,colWidths=[128,A4[0]-84-128],hAlign='LEFT',repeatRows=1)
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#DDEEF0')),
                ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#F2F6F7'),colors.white]),
                ('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),
                ('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),
                ('BOTTOMPADDING',(0,0),(-1,-1),7),
            ])); story.extend([table,Spacer(1,5)]); continue
        style='body'
        if line.startswith('# '): style='h1'; line=line[2:]
        elif line.startswith('## '): style='h2'; line=line[3:]
        elif re.match(r'^\[\d+\]',line): style='small'
        story.append(Paragraph(markup(line),styles[style])); i+=1
    doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=48,bottomMargin=43,
        title='REXMI Mission Vision - Baseline v1.0',author='FARFIELD Robotics',subject='40-degree lunar crater access; 25 kg mission baseline')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    print(OUT)

if __name__=='__main__': main()
