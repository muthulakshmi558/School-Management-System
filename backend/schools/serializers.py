from rest_framework import serializers
from .models import School, Teacher, Student, Subject

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name']

class TeacherSerializer(serializers.ModelSerializer):
    subjects = serializers.StringRelatedField(many=True)  # Shows subject names

    class Meta:
        model = Teacher
        fields = ['id', 'name', 'subjects']

class SubjectSerializer(serializers.ModelSerializer):
    teachers = serializers.StringRelatedField(many=True)  # Shows teacher names

    class Meta:
        model = Subject
        fields = ['id', 'name', 'teachers']

class SchoolSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)  # Nested: Shows students per school

    class Meta:
        model = School
        fields = ['id', 'name', 'address', 'students']