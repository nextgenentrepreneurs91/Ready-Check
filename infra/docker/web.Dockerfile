# infra/k8s/api/deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: readycheck-api
  labels:
    app: readycheck
    component: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: readycheck
      component: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: readycheck
        component: api
    spec:
      containers:
        - name: api
          image: readycheck-api:latest # Typically replaced by CI/CD tag
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 4000
              name: http
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: readycheck-secrets
                  key: database-url
            - name: REDIS_URL
              value: "redis://readycheck-redis-service:6379"
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: readycheck-secrets
                  key: jwt-secret
            - name: GEMINI_API_KEY
              valueFrom:
                secretKeyRef:
                  name: readycheck-secrets
                  key: gemini-api-key
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "500m"
              memory: "1Gi"
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 15
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 20
```
