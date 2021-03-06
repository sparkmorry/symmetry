from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'symmetry.views.intro', name='intro'),
    url(r'^draw/$', 'symmetry.views.home', name='home'),
    url(r'^play/(?P<id>\d+)/$', 'symmetry.views.play', name='play'),
    url(r'^name/(?P<work_id>\d+)/$', 'symmetry.views.name', name='name'),
    url(r'^more/$', 'symmetry.views.more', name='more'),
    url(r'^api/share/$', 'symmetry.work.views.create', name='create'),
    url(r'^api/author/$', 'symmetry.work.views.author', name='author'),


    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
