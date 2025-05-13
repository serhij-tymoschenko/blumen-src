import {
    COMMENT_REGEX,
    DEFS_REGEX,
    DOCTYPE_REGEX, EMPTY_LINE_REGEX,
    INK_GROUP_REGEX,
    INK_LABEL_REGEX,
    SODI_REGEX,
    STYLE_REGEX,
    SVG_REGEX,
    UTF_REGEX,
} from "../Constants";
import {addCss} from "./Css";

const removeComments = (content) => {
    return content.replace(COMMENT_REGEX, "")
}

const normalizeXml = (content) => {
    return content.replace(UTF_REGEX, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
}

const removeDoctype = (content) => {
    return content.replace(DOCTYPE_REGEX, "")
}

const normalizeSvg = (content) => {
    return content.replace(SVG_REGEX, "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 600\">")
}

const removeSodi = (content) => {
    return content.replace(SODI_REGEX, "")
}

const normalizeG = (content) => {
    return content
        .replace(INK_LABEL_REGEX, "")
        .replace(INK_GROUP_REGEX, "")
}

const addClasses = (content) => {
    if (!STYLE_REGEX.test(content)) {
        let localContent = content.replace(DEFS_REGEX, "");
        localContent = addCss(localContent)
        return localContent
    }
    return content;
}

const correctCss = (content) => {
    return content.replace('#0000ff', 'blue')
}

const removeEmptyLines = (content) => {
    return content.replace(EMPTY_LINE_REGEX, "");
}

const convert = (content) => {
    let localContent = content;

    localContent = removeComments(localContent);
    localContent = removeDoctype(localContent);
    localContent = normalizeXml(localContent);
    localContent = normalizeSvg(localContent);
    localContent = removeSodi(localContent);
    localContent = normalizeG(localContent);
    localContent = addClasses(localContent);
    localContent = correctCss(localContent);
    localContent = removeEmptyLines(localContent);

    return localContent;
}

export default convert;