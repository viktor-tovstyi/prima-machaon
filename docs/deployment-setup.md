# Deployment Setup for Prima MachaOn  

This guide explains how to deploy the **Prima MachaOn** application to **Azure Kubernetes Service (AKS)** using a containerized infrastructure. The deployment is based on the framework provided by the **[Azure AKS MachaOn project](https://macha.machanism.org/machaon/containers-machaon/azure-containers/azure-aks-machaon)**. Prima MachaOn uses Machanism libraries and modules to build scalable and reusable modular customer-based projects.

## Prerequisites  

Before proceeding, ensure you have the following:  

1. **Azure Account**: A valid and active Azure account. You can sign up at [Azure Portal](https://portal.azure.com) if you don't have one.  
2. **Azure CLI**: Install the Azure CLI tool. Follow the instructions in the [Azure CLI Installation Guide](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).  
3. **Docker Setup**: Docker installed and configured, with support for **Buildx** (Docker multi-platform build).  
4. **kubectl CLI**: Install `kubectl` to manage Kubernetes clusters. Refer to the [kubectl Installation Guide](https://kubernetes.io/docs/tasks/tools/).  
5. **DockerHub Account**: To push Docker images.  

## Deploying Prima MachaOn  

### Step 1: Log In to Azure  

Using Azure CLI, log in to your Azure account:  

```bash
az login
```

Log in through the browser and verify your active subscriptions:  

```bash
az account list
```

### Step 2: Create an AKS Cluster  

1. Go to the [Azure Portal](https://portal.azure.com).  
2. Search for **Azure Kubernetes Service (AKS)**.  
3. Click **Create** to provision a new AKS cluster:  
   - **Resource Group**: Create or select a resource group (e.g., `macha-group`).  
   - **Cluster Name**: Enter a name (e.g., `macha-cluster`).  
   - **Region**: Select a region (e.g., `East US`).  
   - **Node Size & Count**: Configure node size and count (e.g., `Standard_DS2_v2` with 3 nodes).  
4. Review and create the cluster.  

### Step 3: Connect to the AKS Cluster  

Once the AKS cluster is provisioned, retrieve its credentials:  

```bash
az aks get-credentials --resource-group macha-group --name macha-cluster
```

Validate the connection by listing cluster nodes:  

```bash
kubectl get nodes
```

You should see the AKS node pool active and ready.

### Step 4: Build and Push the Docker Image  

1. Ensure Docker Buildx is installed. Refer to the [Docker Buildx Installation Guide](https://docs.docker.com/buildx/working-with-buildx/).  

2. Build a multi-platform Docker image:  

```bash
docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t machanism/prima-machaon-app:1.0.0 --push .
```

Explanation:  
- `--no-cache`: Builds a fresh image.  
- `--platform`: Targets multiple platforms (e.g., `linux/amd64` and `linux/arm64`).  
- `-t`: Tags the image (e.g., `machanism/prima-machaon-app:1.0.0`).  
- `--push`: Pushes the image to DockerHub.  

### Step 5: Configure Secrets  

1. Create a `secret.yaml` file to store sensitive data (e.g., API keys).  
   Example:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: prima-secrets
type: Opaque
data:
  CTP_SECRET_KEY: XXXXXXXXXXXXXXXXXXXXXXXXXXXX # Replace with Base64-encoded secret
```

2. Apply the secret to your AKS cluster:  

```bash
kubectl apply -f secret.yaml
```

### Step 6: Deploy the Application  

1. Create a `deployment.yaml` file for Kubernetes deployment.  
   Example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prima-machaon-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: prima-machaon-app
  template:
    metadata:
      labels:
        app: prima-machaon-app
    spec:
      containers:
        - name: prima-app
          image: machanism/prima-machaon-app:1.0.0 # Your DockerHub image tag
          ports:
            - containerPort: 3000
```

2. Deploy the application to AKS:  

```bash
kubectl apply -f deployment.yaml
```

3. Verify the deployment:  

```bash
kubectl get deployments
kubectl get pods
```

### Step 7: Expose the Application  

1. Create a `service.yaml` file to define a Kubernetes LoadBalancer service.  
   Example:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: prima-machaon-service
spec:
  selector:
    app: prima-machaon-app
  ports:
    - protocol: TCP
      port: 80          # Exposed external port
      targetPort: 3000  # Internal container port
  type: LoadBalancer
```

2. Apply the service configuration:  

```bash
kubectl apply -f service.yaml
```

3. Check the service status and get the public IP address:  

```bash
kubectl get svc
```

Example output:

```
NAME                     TYPE           CLUSTER-IP    EXTERNAL-IP      PORT(S)        AGE
prima-machaon-service    LoadBalancer   10.0.125.78   20.30.40.50      80:30379/TCP   2m
```

Access your application using the external IP:  

```
http://20.30.40.50
```

### Step 8: Debugging and Logs  

- **List Pods**:  

  ```bash
  kubectl get pods
  ```

- **View Pod Logs**: Replace `<pod_name>` with the name of your pod:  

  ```bash
  kubectl logs <pod_name>
  ```

## Summary of Commands  

1. **Login to Azure**:  
   ```bash
   az login
   ```

2. **Get AKS Credentials**:  
   ```bash
   az aks get-credentials --resource-group macha-group --name macha-cluster
   ```

3. **Build and Push Docker Image**:  
   ```bash
   docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t machanism/prima-machaon-app:1.0.0 --push .
   ```

4. **Apply Secrets**:  
   ```bash
   kubectl apply -f secret.yaml
   ```

5. **Deploy Application**:  
   ```bash
   kubectl apply -f deployment.yaml
   ```

6. **Expose Service**:  
   ```bash
   kubectl apply -f service.yaml
   ```

7. **Get Public IP**:  
   ```bash
   kubectl get svc
   ```

8. **Debugging**:  
   ```bash
   kubectl logs <pod_name>
   ```

## References  

- **Azure Portal**: [https://portal.azure.com](https://portal.azure.com)  
- **Machanism Platform**: [https://www.machanism.org](https://www.machanism.org)  
- **Azure AKS MachaOn**: [https://macha.machanism.org](https://macha.machanism.org/machaon/containers-machaon/azure-containers/azure-aks-machaon)  

Follow this guide to deploy Prima MachaOn to your Azure AKS environment and customize it further as needed!