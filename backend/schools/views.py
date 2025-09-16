from rest_framework import viewsets
from rest_framework.response import Response
from .models import School, Teacher, Student, Subject
from .serializers import SchoolSerializer, TeacherSerializer, StudentSerializer, SubjectSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all().prefetch_related('students')  # Optimize for nested students
    serializer_class = SchoolSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().select_related('school').prefetch_related('subjects')  # Optimize ForeignKey and ManyToMany
    serializer_class = TeacherSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().select_related('school')  # Optimize ForeignKey
    serializer_class = StudentSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all().select_related('school').prefetch_related('teachers')  # Optimize ForeignKey and ManyToMany
    serializer_class = SubjectSerializer