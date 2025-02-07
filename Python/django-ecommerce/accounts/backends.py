from django.contrib.auth.backends import ModelBackend as BaseModelBackend
from django.contrib.auth import get_user_model


class ModelBackend(BaseModelBackend):

    def authenticate(self, username=None, password=None):
        
        if not username is None:
            UserModel = get_user_model()

            try:
                user = UserModel.objects.get(email=username)

                if user.check_password(password):
                    return user

            except UserModel.DoesNotExist:
                pass
