from .serializers import GlobalErrorSerializer

def global_errors(*codes):
        return {code: GlobalErrorSerializer for code in codes}