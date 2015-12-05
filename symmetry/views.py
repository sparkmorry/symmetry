# -*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from symmetry.work.models import Work

import json

def home(request):
	js='main'
	return render_to_response('draw.html', {'js': js})

def intro(request):
	js='intro'
	return render_to_response('intro.html', {'js': js})

def more(request):
	js='more'
	try:
		print ' try'
		works = list(Work.objects.filter(id__in=(16, 17, 19, 21, 15, 20)))
	except:
		print ' except'

		works = Work.objects.all()[0:6]
	return render_to_response('more.html', {'js': js, 'works': works})

def name(request, work_id):
	js='name'
	return render_to_response('name.html', {'js': js, 'work_id': work_id})

def play(request, id):
	js='play'
	work = Work.objects.get(id=id)
	return render_to_response('play.html', {'js': js, 'work': work})
