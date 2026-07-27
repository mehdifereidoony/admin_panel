import { Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./MenuBar";
import "./RichTextEditor.css";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const RichTextEditor = ({ name, formControl, label, error, className }) => {
  return (
    <Controller
      name={name}
      control={formControl}
      render={({ field }) => (
        <Tiptap
          field={field}
          label={label}
          error={error}
          className={className}
        />
      )}
    />
  );
};

const Tiptap = ({ field, label, error, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        enableClickSelection: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "متن خود را وارد کنید...",
      }),
    ],

    content: field.value || "",

    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML());
    },
  });

  return (
    <div className={`rich-editor col-12 mb-3 ${className}`}>
      <label className="form-label">{label}</label>

      <MenuBar editor={editor} />

      <EditorContent editor={editor} />

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default RichTextEditor;
