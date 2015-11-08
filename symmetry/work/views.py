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

        print num

        response_data = {}

        work = Work(author=author, points=ptns, num=num)
        work.save();

        wid = work.id

        response_data['code']=0
        response_data['data'] = wid

        return HttpResponse(json.dumps(response_data), content_type="application/json")
