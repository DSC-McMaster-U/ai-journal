import './editor.css';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Highlight from '@tiptap/extension-highlight';
import { BubbleMenu, EditorProvider, FloatingMenu, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Bold,
  Code,
  Eraser,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Undo2
} from 'lucide-react';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-0 bg-background z-30 overflow-x-auto p-2 border-t w-screen">
      <div className="grid grid-cols-9 gap-2 auto-rows-auto">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          size="icon"
          className="p-2">
          <Bold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <Italic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <Strikethrough />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editor.isActive('paragraph') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          P
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H4
        </Button>
        <div></div>

        {/* <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          variant={editor.isActive('heading', { level: 5 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          variant={editor.isActive('heading', { level: 6 }) ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          H6
        </Button> */}
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <List />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <ListOrdered />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <Quote />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? 'default' : 'outline'}
          size="icon"
          className="p-2 text-red-600">
          <div className="px-1 rounded-sm">C</div>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          size="icon"
          className="p-3">
          <Code />
        </Button>

        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-3"
          size="icon"
          variant="secondary">
          <Minus />
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-3"
          size="icon"
          variant="secondary">
          <Undo2 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-3"
          size="icon"
          variant="secondary">
          <Redo2 />
        </Button>
        <Button
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
          className="p-3"
          size="icon"
          variant="secondary">
          <Eraser />
        </Button>
        {/* <Button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          variant={editor.isActive('textStyle', { color: '#958DF1' }) ? 'default' : 'outline'}
          className="p-3">
          Purple
        </Button> */}
      </div>
    </div>
  );
};

const BubbleBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      className="bg-background border border-foreground/25 rounded-lg flex font-medium shadow-lg relative z-20"
      tippyOptions={{ duration: 100 }}
      editor={editor}>
      <Button
        variant={editor.isActive('bold') ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </Button>
      <Button
        variant={editor.isActive('italic') ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </Button>
      <Button
        variant={editor.isActive('strike') ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        Strike
      </Button>
    </BubbleMenu>
  );
};

const FloatingBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu
      className="bg-background border border-foreground/25 rounded-lg flex font-medium shadow-lg"
      tippyOptions={{ duration: 100 }}
      editor={editor}>
      <Button
        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </Button>
      <Button
        variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Button>
      <Button
        variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Bullet list
      </Button>
    </FloatingMenu>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  }),
  Highlight,
  Typography
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const JournalEditor = () => {
  return (
    <EditorProvider
      slotAfter={[<BubbleBar key={0} />, <FloatingBar key={1} />, <MenuBar key={2} />]}
      extensions={extensions}
      content={content}></EditorProvider>
  );
};

export default JournalEditor;
