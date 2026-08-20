import ToolbarButton from "./ToolbarButton";

const toolbarButtons = [
  {
    label: "B",
    active: "bold",
    command: (editor) => editor.chain().focus().toggleBold().run(),
  },

  {
    label: "I",
    active: "italic",
    command: (editor) => editor.chain().focus().toggleItalic().run(),
  },

  {
    label: "S",
    active: "strike",
    command: (editor) => editor.chain().focus().toggleStrike().run(),
  },
];

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="toolbar">
      {toolbarButtons.map((button) => (
        <ToolbarButton
          key={button.label}
          active={editor.isActive(button.active)}
          command={() => button.command(editor)}
        >
          {button.label}
        </ToolbarButton>
      ))}
    </div>
  );
};

export default EditorToolbar;
