export const sunEditorOptions = {
    height: "400px",
    buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        [
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
        ],
        ["fontColor", "hiliteColor"],
        ["align", "horizontalRule", "list", "table"],
        ["link", "image", "video"],
        ["fullScreen", "showBlocks", "codeView"],
        ["preview", "print"],
    ],
    defaultStyle:
        "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
    imageUploadUrl: "/api/upload",
};
