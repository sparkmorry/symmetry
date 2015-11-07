# -*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json

def home(request):
	js='main'
	return render_to_response('index.html', {'js': js})

def intro(request):
	js='intro'
	return render_to_response('intro.html', {'js': js})

def play(request):
	js='play'
	return render_to_response('play.html', {'js': js})
