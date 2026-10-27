from django.contrib import admin
from .models import StockPrediction

@admin.register(StockPrediction)
class StockPredictionAdmin(admin.ModelAdmin):
    list_display = ['user', 'ticker', 'mse', 'rmse', 'r2', 'created_at']
    list_filter = ['ticker', 'created_at']
    search_fields = ['user__username', 'ticker']
