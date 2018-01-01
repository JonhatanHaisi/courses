
from .models import CartItem

def cart_item_middleware(get_response):

    def middleware(request):
        
        old_session_key = request.session.session_key
        response = get_response(request)
        new_session_key = request.session.session_key

        if old_session_key != new_session_key:
            CartItem.objects.filter(cart_key = old_session_key).update(cart_key=new_session_key)

        return response

    return middleware
