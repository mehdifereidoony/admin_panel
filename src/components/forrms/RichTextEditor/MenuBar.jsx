import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  UnderlineIcon,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { useEffect, useState } from "react";

const MenuBar = ({ editor }) => {
  const [, forceUpdate] = useState(0);
  if (!editor) {
    return null;
  }
  useEffect(() => {
    editor.on("selectionUpdate", () => {
      forceUpdate((prev) => prev + 1);
    });
  
    editor.on("transaction", () => {
      forceUpdate((prev) => prev + 1);
    });
  
  
    return () => {
      editor.off("selectionUpdate");
      editor.off("transaction");
    };
  
  }, [editor]);
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  const addImage = () => {
    const url = window.prompt("Image URL");

    if (url) {
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
        })
        .run();
    }
  };

  return (
    <div className="editor-toolbar">
      <button
        type="button"
        className={editor.isActive("bold") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("italic") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("underline") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("link") ? "active" : ""}
        onClick={setLink}
      >
        <LinkIcon size={18} />
      </button>

      <button type="button" onClick={addImage}>
        <ImageIcon size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("strike") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={18} />
      </button>

      <div className="toolbar-divider" />

      <button
        type="button"
        className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={18} />
      </button>

      <div className="toolbar-divider" />

      <button
        type="button"
        className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify size={18} />
      </button>

      <div className="toolbar-divider" />

      <button
        type="button"
        className={editor.isActive("bulletList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} />
      </button>

      <button
        type="button"
        className={editor.isActive("orderedList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </button>

      <div className="toolbar-divider" />

      <button
        type="button"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={18} />
      </button>

      <button
        type="button"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
};

export default MenuBar;
