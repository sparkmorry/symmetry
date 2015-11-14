import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from symmetry.work.models import Work

# Create your views here.
@csrf_exempt
def create(request):
    if request.method == 'POST':
        ptns = request.REQUEST.get('pnts', '')
        author = request.REQUEST.get('author', 'noname')
        num = request.REQUEST.get('num', 10)

        response_data = {}

        work = Work(author=author, points=ptns, num=num)
        work.save();

        wid = work.id

        response_data['code']=0
        response_data['data'] = wid

        return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def author(request):
    if request.method == 'POST':
        work_id = int(request.REQUEST.get('id', -1))
        author = request.REQUEST.get('author', 'noname')

        response_data = {}

        work = Work.objects.get(id=work_id)
        work.author = author
        work.save();

        response_data['code']=0
        response_data['data'] = work_id

        return HttpResponse(json.dumps(response_data), content_type="application/json")
