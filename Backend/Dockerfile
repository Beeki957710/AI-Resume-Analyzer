FROM python:3.10-slim

WORKDIR /app

# Tell Python to look inside /app/src for module imports
ENV PYTHONPATH=/app/src

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start Uvicorn web server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]