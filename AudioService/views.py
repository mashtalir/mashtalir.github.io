from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render
from .models import AudioList
from .models import Audio
from .models import User
from .forms import UserForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from django.http import JsonResponse


def index(request):
    if request.user.is_authenticated:
        audiolists = AudioList.objects.filter(
            connect__username=request.user.username)
        return render(request, 'AudioService/post_lost.html', {"audiolists": audiolists})


def audio_list_post(request):

    if request.method == "POST":
        audiolist = AudioList()
        audiolist.name = request.POST.get("name")
        audiolist.type = request.POST.get("type")
        user = User.objects.get(id=request.user.id)
        audiolist.save()
        user.audiolist_set.add(audiolist)
    return HttpResponseRedirect("/AudioService")


def audio_list_put(request, id):
    try:
        audiolist = AudioList.objects.get(id=id)
        if request.method == "POST":
            audiolist.name = request.POST.get("name")
            audiolist.type = request.POST.get("type")
            audiolist.save()
            return HttpResponseRedirect("/AudioService")
        else:
            return render(request, "AudioService/post_edit.html", {"audiolists": audiolist})
    except AudioList.DoesNotExist:
        return HttpResponseNotFound("<h2>AudioList not found</h2>")


def audio_list_delete(request, id):
    try:
        audiolist = AudioList.objects.get(id=id)
        audiolist.delete()
        return HttpResponseRedirect("/AudioService")
    except AudioList.DoesNotExist:
        return HttpResponseNotFound('<h2>AudioList not Found </h2>')


def audio_add(request, id):
    if request.method == "POST":
        audiolist = AudioList.objects.get(id=id)
        audio = Audio()
        audio.name = request.POST.get('name')
        audio.file = request.FILES.get('file')
        audio.save()
        audiolist.audio_set.add(audio)
        idd = str(id)
        return HttpResponseRedirect('/AudioService/add-audio/' + idd + '/')
    else:
        audiolist = AudioList.objects.get(id=id)
        audios = audiolist.audio_set.all()
        return render(request, "AudioService/audio_create.html", {"audios": audios})


def audio_delete(request, id1, id):
    try:
        audio = Audio.objects.get(id=id)
        audiolist = AudioList.objects.get(id=id1)
        audio.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    except AudioList.DoesNotExist:
        return HttpResponseNotFound('<h2>Song not Found </h2>')


def playlist_rendering(request):
    page = 'AudioService/playlist.html'
    return render(request, page)


def registration_rendering(request):
    page = 'AudioService/registration.html'
    return render(request, page)


def user_create(request):
    # userform = UserForm()
    # if request.method == "POST":
    #     form = UserForm(request.POST)
    #     print(request)

    #     if form.is_valid():
    #         user = form.save(commit=False)
    #         username = form.cleaned_data['username']
    #         password = form.cleaned_data['password']
    #         user.set_password(password)
    #         user.save()
    #         return HttpResponseRedirect('/log-in')
    #     else:
    #         return HttpResponse(content=404)
    # else:
    #     return render(request, "AudioService/sign in.html", {"form": userform})

    if request.method == 'POST':
        # username = request.POST.get('username')
        # email = request.POST.get('email')
        # password = request.POST.get('password')
        # repeated_password = request.POST.get('repeated_password')

        # print(username, email, password, repeated_password)
        # User.objects.create(
        #     username=username,
        #     email=email,
        #     password=password,
        # )
        response_data = {'result': 'ok'}
        parsed_json_new_user = (json.loads(request.body))
        username = parsed_json_new_user['username']
        email = parsed_json_new_user['email']
        password = parsed_json_new_user['password']

        try:
            User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
        except:
            response_data['result'] = 'failure'
            print('failure')
        response_data = json.dumps(response_data)
        return HttpResponse(response_data)


def profile_rendering(request):
    page = 'AudioService/profile.html'
    return render(request, page)


def profile(request):
    username = request.user.username
    dick = {'username': username}
    print(json.dumps(dick))
    return JsonResponse(dick)


def change_userInfo(request):
    info = json.loads(request.body)
    current_username = request.user.username
    user = User.objects.get(username=current_username)
    if current_username != info['username']:
        user.username = info['username']
    if info['old_password'] != '' and info['new_password'] != '':
        if user.check_password(info['old_password']):
            user.set_password(info['new_password'])
    user.save()
    return HttpResponse('')


def login_rendering(request):
    page = 'AudioService/login.html'
    return render(request, page)


def user_login(request):
    if request.method == "POST":
        response_data = {}
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(
            request=request, username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                response_data['result'] = 'ok'
                return JsonResponse(response_data)
        else:
            response_data['result'] = 'login failure'
            return JsonResponse(response_data)


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login')


def global_search(request):
    username = request.POST.get('username')
    user = User.objects.filter(username=username).count()
    if user == 1:
        audiolist = AudioList.objects.filter(
            connect__username=username, type='public')
        return render(request, "AudioService/global_search.html", {'audiolists': audiolist})
    else:
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def global_edit(request, id):
    if request.method == "POST":
        audiolist = AudioList.objects.get(id=id)
        audio = Audio()
        audio.name = request.POST.get('name')
        audio.file = request.POST.get('file')
        audio.save()
        audiolist.audio_set.add(audio)
        return HttpResponseRedirect(request.path_info)
    else:
        audiolist = AudioList.objects.get(id=id)
        audios = audiolist.audio_set.all()
        return render(request, "AudioService/audio_create.html", {"audios": audios})


def global_delete(request, id):
    try:
        audio = Audio.objects.get(id=id)
        audio.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    except AudioList.DoesNotExist:
        return HttpResponseNotFound('<h2>AudioList not Found </h2>')


def landing(request):
    return render(request, 'AudioService/landing.html')
