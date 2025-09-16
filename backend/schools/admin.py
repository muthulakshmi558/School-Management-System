from django.contrib import admin
from .models import School, Teacher, Student, Subject

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address')
    search_fields = ('name', 'address')
    list_filter = ('name',)
    ordering = ('name',)

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'school', 'get_subjects')
    search_fields = ('name', 'school__name')
    list_filter = ('school',)
    ordering = ('name',)

    def get_subjects(self, obj):
        return ", ".join([subject.name for subject in obj.subjects.all()])
    get_subjects.short_description = 'Subjects'

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'school')
    search_fields = ('name', 'school__name')
    list_filter = ('school',)
    ordering = ('name',)

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'school', 'get_teachers')
    search_fields = ('name', 'school__name')
    list_filter = ('school',)
    ordering = ('name',)

    def get_teachers(self, obj):
        return ", ".join([teacher.name for teacher in obj.teachers.all()])
    get_teachers.short_description = 'Teachers'