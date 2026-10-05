import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search,
  Globe,
  Layout,
  Save,
  ArrowLeft
} from "lucide-react";
import { mockPages, CustomPage } from "../../data/pages";
import { toast } from "sonner";
import { PageEditor } from "./PageEditor";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type View = "list" | "edit" | "create";

export function PagesManagement() {
  const [pages, setPages] = useState<CustomPage[]>(mockPages);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [currentView, setCurrentView] = useState<View>("list");

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateNew = () => {
    const newPage: CustomPage = {
      id: `page-${Date.now()}`,
      title: "New Page",
      slug: "new-page",
      content: "<h1>New Page</h1>\n<p>Start writing your content here...</p>",
      status: "draft",
      showInHeader: false,
      showInFooter: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: "admin",
    };
    setEditingPage(newPage);
    setCurrentView("create");
  };

  const handleEdit = (page: CustomPage) => {
    setEditingPage(page);
    setCurrentView("edit");
  };

  const handleSave = (updatedPage: CustomPage) => {
    if (currentView === "create") {
      setPages([...pages, updatedPage]);
      toast.success("Page created successfully!");
    } else {
      setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
      toast.success("Page updated successfully!");
    }
    setCurrentView("list");
    setEditingPage(null);
  };

  const handleCancel = () => {
    setCurrentView("list");
    setEditingPage(null);
  };

  const handleDelete = (pageId: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      setPages(pages.filter(p => p.id !== pageId));
      toast.success("Page deleted successfully!");
    }
  };

  const handleToggleStatus = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, status: p.status === "published" ? "draft" : "published", updatedAt: new Date().toISOString() }
        : p
    ));
    const page = pages.find(p => p.id === pageId);
    toast.success(`Page ${page?.status === "published" ? "unpublished" : "published"}!`);
  };

  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
  };

  const publishedCount = pages.filter(p => p.status === "published").length;
  const draftCount = pages.filter(p => p.status === "draft").length;
  const headerCount = pages.filter(p => p.showInHeader && p.status === "published").length;
  const footerCount = pages.filter(p => p.showInFooter && p.status === "published").length;

  // Show editor view
  if (currentView === "edit" || currentView === "create") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pages
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentView === "create" ? "Create New Page" : `Edit: ${editingPage?.title}`}
            </h2>
            <p className="text-sm text-gray-500">Create and manage your custom page content</p>
          </div>
        </div>

        {/* Editor */}
        {editingPage && (
          <PageEditor
            page={editingPage}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    );
  }

  // Show list view
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Header</p>
                <p className="text-2xl font-bold text-blue-600">{headerCount}</p>
              </div>
              <Layout className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Footer</p>
                <p className="text-2xl font-bold text-purple-600">{footerCount}</p>
              </div>
              <Layout className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pages</CardTitle>
              <CardDescription>Manage custom pages and content</CardDescription>
            </div>
            <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Page
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search pages by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All ({pages.length})
              </Button>
              <Button
                variant={filterStatus === "published" ? "default" : "outline"}
                onClick={() => setFilterStatus("published")}
                size="sm"
              >
                Published ({publishedCount})
              </Button>
              <Button
                variant={filterStatus === "draft" ? "default" : "outline"}
                onClick={() => setFilterStatus("draft")}
                size="sm"
              >
                Drafts ({draftCount})
              </Button>
            </div>
          </div>

          {/* Pages Table */}
          <div className="space-y-3">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 text-lg">{page.title}</h4>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">/{page.slug}</span>
                      <span>Updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
                      <span>By: {page.author}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      {page.showInHeader && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Layout className="w-4 h-4" />
                          <span>Header</span>
                        </div>
                      )}
                      {page.showInFooter && (
                        <div className="flex items-center gap-1 text-purple-600">
                          <Layout className="w-4 h-4" />
                          <span>Footer (Column {page.footerColumn})</span>
                        </div>
                      )}
                      {!page.showInHeader && !page.showInFooter && (
                        <span className="text-gray-400">Not displayed in navigation</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(page.id)}
                      title={page.status === "published" ? "Unpublish" : "Publish"}
                    >
                      {page.status === "published" ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pages found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}