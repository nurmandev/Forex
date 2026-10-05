import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CustomPage } from "../../data/pages";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Save,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PageEditorProps {
  page: CustomPage;
  onSave: (page: CustomPage) => void;
  onCancel: () => void;
}

export function PageEditor({ page, onSave, onCancel }: PageEditorProps) {
  const [formData, setFormData] = useState(page);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleChange = (field: keyof CustomPage, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    // Generate slug from title if empty
    if (!formData.slug || formData.slug === "new-page") {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
      onSave({ ...formData, slug });
    } else {
      onSave(formData);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = formData.content;

    switch (format) {
      case 'h1':
        newText = formData.content.substring(0, start) + `<h1>${selectedText || 'Heading 1'}</h1>` + formData.content.substring(end);
        break;
      case 'h2':
        newText = formData.content.substring(0, start) + `<h2>${selectedText || 'Heading 2'}</h2>` + formData.content.substring(end);
        break;
      case 'h3':
        newText = formData.content.substring(0, start) + `<h3>${selectedText || 'Heading 3'}</h3>` + formData.content.substring(end);
        break;
      case 'bold':
        newText = formData.content.substring(0, start) + `<strong>${selectedText || 'bold text'}</strong>` + formData.content.substring(end);
        break;
      case 'italic':
        newText = formData.content.substring(0, start) + `<em>${selectedText || 'italic text'}</em>` + formData.content.substring(end);
        break;
      case 'underline':
        newText = formData.content.substring(0, start) + `<u>${selectedText || 'underlined text'}</u>` + formData.content.substring(end);
        break;
      case 'ul':
        newText = formData.content.substring(0, start) + `<ul>\n<li>${selectedText || 'List item'}</li>\n</ul>` + formData.content.substring(end);
        break;
      case 'ol':
        newText = formData.content.substring(0, start) + `<ol>\n<li>${selectedText || 'List item'}</li>\n</ol>` + formData.content.substring(end);
        break;
      case 'link':
        newText = formData.content.substring(0, start) + `<a href="https://example.com">${selectedText || 'link text'}</a>` + formData.content.substring(end);
        break;
      case 'image':
        newText = formData.content.substring(0, start) + `<img src="image-url.jpg" alt="${selectedText || 'Image description'}" />` + formData.content.substring(end);
        break;
      case 'code':
        newText = formData.content.substring(0, start) + `<code>${selectedText || 'code'}</code>` + formData.content.substring(end);
        break;
      case 'p':
        newText = formData.content.substring(0, start) + `<p>${selectedText || 'Paragraph text'}</p>` + formData.content.substring(end);
        break;
    }

    handleChange('content', newText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Settings */}
      <div className="lg:col-span-1 space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
            <CardDescription>Configure basic page information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Terms of Service"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="e.g., terms-of-service"
                required
              />
              <p className="text-xs text-gray-500">URL: /{formData.slug}</p>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Display Options</CardTitle>
            <CardDescription>Control where this page appears</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showInHeader"
                  checked={formData.showInHeader}
                  onCheckedChange={(checked) => handleChange('showInHeader', checked)}
                />
                <Label htmlFor="showInHeader" className="cursor-pointer font-medium">
                  Display in Header Navigation
                </Label>
              </div>
              <p className="text-xs text-gray-500 ml-6">Show this page in the top header menu</p>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showInFooter"
                  checked={formData.showInFooter}
                  onCheckedChange={(checked) => handleChange('showInFooter', checked)}
                />
                <Label htmlFor="showInFooter" className="cursor-pointer font-medium">
                  Display in Footer
                </Label>
              </div>

              {formData.showInFooter && (
                <div className="ml-6 space-y-2">
                  <Label className="text-sm text-gray-600">Footer Column:</Label>
                  <RadioGroup
                    value={formData.footerColumn?.toString() || "1"}
                    onValueChange={(value) => handleChange('footerColumn', parseInt(value))}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="col1" />
                      <Label htmlFor="col1" className="cursor-pointer text-sm">Column 1 - Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="col2" />
                      <Label htmlFor="col2" className="cursor-pointer text-sm">Column 2 - Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="col3" />
                      <Label htmlFor="col3" className="cursor-pointer text-sm">Column 3 - Resources</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="col4" />
                      <Label htmlFor="col4" className="cursor-pointer text-sm">Column 4 - Legal</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Publication Status */}
        <Card>
          <CardHeader>
            <CardTitle>Publication</CardTitle>
            <CardDescription>Control page visibility</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) => handleChange('status', value as "published" | "draft")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Draft</div>
                    <div className="text-xs text-gray-500">Not visible to users</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Published</div>
                    <div className="text-xs text-gray-500">Visible to all users</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Page
            </Button>
            <Button variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
            <div className="text-xs text-gray-500 pt-2 border-t">
              Last updated: {new Date(formData.updatedAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Content Editor */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
            <CardDescription>Write and preview your page content</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")} className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full">
                <TabsTrigger value="edit" className="flex-1">Edit</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="flex-1 flex flex-col mt-4 min-h-0">
                {/* Toolbar */}
                <div className="border border-b-0 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h1')}
                    title="Heading 1"
                    className="h-8"
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h2')}
                    title="Heading 2"
                    className="h-8"
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('h3')}
                    title="Heading 3"
                    className="h-8"
                  >
                    <Heading3 className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('bold')}
                    title="Bold"
                    className="h-8"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('italic')}
                    title="Italic"
                    className="h-8"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('underline')}
                    title="Underline"
                    className="h-8"
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('ul')}
                    title="Bullet List"
                    className="h-8"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('ol')}
                    title="Numbered List"
                    className="h-8"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('link')}
                    title="Insert Link"
                    className="h-8"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('image')}
                    title="Insert Image"
                    className="h-8"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('code')}
                    title="Inline Code"
                    className="h-8"
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => insertFormatting('p')}
                    title="Paragraph"
                    className="h-8 text-xs font-semibold"
                  >
                    P
                  </Button>
                </div>

                {/* Content Editor */}
                <textarea
                  id="content-editor"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="flex-1 w-full border border-gray-300 rounded-b-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[500px]"
                  placeholder="Write your HTML content here..."
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1 mt-4 overflow-auto min-h-[500px]">
                <div className="border rounded-lg p-8 bg-white prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
