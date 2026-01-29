"""
API URL routing for CTCDMS. Endpoints under CtcdmsDg/api/ per design report.
JWT login: POST CtcdmsDg/api/token/ with username, password.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.hospitals.views import HospitalViewSet, HospitalSugViewSet, HospitalOfficeViewSet
from apps.items.views import ItemViewSet, ItemTeaViewSet
from apps.indoor.views import BackApiIndoor19ViewSet
from apps.outdoor.views import OutdoorViewSet, OutdoorOffsetCurveViewSet
from apps.scores.views import HospitalScoreViewSet, ExamineResultViewSet
from apps.project_cv.views import ProjectMonthCvViewSet
from apps.mutual.views import MutualRecognitionViewSet

router = DefaultRouter()
# Hospital & indoor (design report 3.2)
router.register(r'HospitalDrf', HospitalViewSet, basename='hospital')
router.register(r'HospitalSugDrf', HospitalSugViewSet, basename='hospital-sug')
router.register(r'HospitalOfficeDrf', HospitalOfficeViewSet, basename='hospital-office')
router.register(r'BackApiIndoor19Drf', BackApiIndoor19ViewSet, basename='backapi-indoor-19')
# Items
router.register(r'SearchItemDrf', ItemViewSet, basename='search-item')
router.register(r'ItemTeaDrf', ItemTeaViewSet, basename='item-tea')
# Outdoor
router.register(r'OutdoorDataDrf', OutdoorViewSet, basename='outdoor-data')
router.register(r'OutdoorOffsetCurveDrf', OutdoorOffsetCurveViewSet, basename='outdoor-offset-curve')
# Scores
router.register(r'HospitalScoreDrf', HospitalScoreViewSet, basename='hospital-score')
router.register(r'ExamineResultDrf', ExamineResultViewSet, basename='examine-result')
# Project CV
router.register(r'ProjectMonthCvDrf', ProjectMonthCvViewSet, basename='project-month-cv')
# Mutual recognition
router.register(r'AllMutualRecognitionDrf', MutualRecognitionViewSet, basename='mutual-recognition')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
