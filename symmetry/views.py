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

def play(request, id):
	js='play'
	work = Work.objects.get(id=id)
	return render_to_response('play.html', {'js': js, 'work': work})
