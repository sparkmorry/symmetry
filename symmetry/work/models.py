# -*- coding:utf-8 -*-

from datetime import datetime

from django.db import models


class Work(models.Model):
    author = models.CharField('作者', max_length=30)
    points = models.TextField('点集合')
    ctime = models.DateTimeField('创建时间', max_length=30, auto_now_add=True)
    utime = models.DateTimeField('最新修改时间', max_length=30, auto_now=True)
    status = models.CharField('状态', max_length=3, default='0')

    class Meta:
        verbose_name = '作品'
        verbose_name_plural = '作品'

    def __unicode__(self):
        return self.title

