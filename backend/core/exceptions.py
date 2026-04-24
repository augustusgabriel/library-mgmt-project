from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response:
        errors = response.data

        custom_data = {
            "status": "error",
            "message": "Corrija os erros abaixo:" if response.status_code == 400 else "Erro no servidor",
            "details": errors
        }
        response.data = custom_data
    
    return response