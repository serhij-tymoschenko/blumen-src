export const names = [
    "Face",
    "Eyes",
    "Top",
    "Bottom",
    "Hat",
    "Front hair",
    "Back hair",
    "Left",
    "Right",
    "Background"
]

export const UTF_REGEX = "<\\?xml\\s+[^?]*\\?>";
export const COMMENT_REGEX = /<!--[^-]+-->/g;
export const DOCTYPE_REGEX = /<!DOCTYPE\s+svg(?:\s+(?:PUBLIC|SYSTEM)\s+"[^"]*"(?:\s+"[^"]*")?)?\s*>/i;
export const SVG_REGEX = /<svg\b[^>]*?>/is;
export const SODI_REGEX = /<sodipodi:namedview\b[^>]*?>[\s\S]*?<\/sodipodi:namedview>/i;
export const STYLE_REGEX = /<style\b[^>]*>[\s\S]*?<\/style>/i;
export const DEFS_REGEX = /<defs\b[^>]*\/>/i;
export const STYLE_PARAM_REGEX = /style="([^"']+)"/g;
export const INK_LABEL_REGEX = /\s*inkscape:label="[^"]*"/g
export const INK_GROUP_REGEX = /\s*inkscape:groupmode="[^"]*"/g
export const RGB_REGEX = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g;
export const EMPTY_LINE_REGEX = /^\s*[\r\n]/gm;