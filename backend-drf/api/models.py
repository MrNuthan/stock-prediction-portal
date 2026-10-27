from django.db import models
from django.contrib.auth.models import User


class StockPrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='predictions')
    ticker = models.CharField(max_length=20)
    plot_img = models.CharField(max_length=255, blank=True)
    plot_100_dma = models.CharField(max_length=255, blank=True)
    plot_200_dma = models.CharField(max_length=255, blank=True)
    plot_prediction = models.CharField(max_length=255, blank=True)
    mse = models.FloatField()
    rmse = models.FloatField()
    r2 = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.ticker} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
