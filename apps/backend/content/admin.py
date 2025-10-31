"""Content admin."""
from django.contrib import admin
from .models import BlogPost, Page, PageContent


class PageContentInline(admin.TabularInline):
    """Inline for page content."""
    model = PageContent
    extra = 1
    fields = ['locale', 'title', 'is_active']


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_active', 'created_at']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PageContentInline]
    search_fields = ['title', 'slug']
    list_filter = ['is_active', 'created_at']


@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'locale', 'is_active', 'updated_at']
    list_filter = ['locale', 'is_active', 'updated_at']
    search_fields = ['page__title', 'page__slug', 'title']
    fieldsets = [
        ('Relation', {
            'fields': ['page', 'locale']
        }),
        ('Content', {
            'fields': ['title', 'subtitle', 'body']
        }),
        ('SEO', {
            'fields': ['meta_description', 'meta_keywords']
        }),
        ('Additional', {
            'fields': ['extra_data', 'is_active']
        }),
    ]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_at', 'created_at']
    prepopulated_fields = {'slug': ('title',)}

