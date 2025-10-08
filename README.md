# Prima MachaOn  

**Prima MachaOn** is an example project demonstrating how to leverage the **Machanism platform** for the creation of a dedicated customer-oriented application. It showcases the practical integration of reusable libraries and modules from **Machanism Seed Projects** and Non-Seed Projects, while adhering to the core principles of **Clean Architecture**—modularity, reusability, scalability, and maintainability.  

This project provides a complete, operational implementation that developers can use as a reference or blueprint for building customized systems with Machanism libraries. It includes deployment configurations and application-specific adaptations tailored to meet real-world customer requirements.  

---

## About Prima MachaOn  

Prima MachaOn was created based on the resources provided by the **[MachaOn](https://macha.machanism.org/machaon/containers-machaon/azure-containers/azure-aks-machaon)** project. It utilizes the foundational deployment configurations and reusable components available from the MachaOn ecosystem, demonstrating how to:  
- Integrate **Core libraries** and **Applications modules** available within Machanism Seed Projects.  
- Customize workflows and add customer-specific requirements.  
- Deploy an application to **Azure Kubernetes Service (AKS)** using containerization best practices.

This repository offers a concrete, step-by-step example of implementing a MachaOn Project for a business-specific use case.

---

## Features  

- **Integration with Machanism Libraries**: Prima MachaOn connects reusable libraries built with Machanism Seed Projects to deliver modular and scalable functionality.  
- **Clean Architecture Compliance**: Adheres to Machanism's philosophy of separating concerns and keeping the system modular and maintainable.  
- **Azure Kubernetes Service (AKS) Deployment**: Provides a deployment-ready configuration using containers to build cloud-native systems with Azure infrastructure.  
- **Customizability**: Demonstrates how to adapt and extend Core and Applications libraries to match unique business requirements.  
- **Reference Implementation**: Serves as a practical blueprint for building new, customer-specific projects on the Machanism platform.

---

## Getting Started  

1. **Clone the Prima MachaOn Repository**:  
   ```
   git clone https://github.com/viktor-tovstyi/prima-machaon.git
   cd prima-machaon
   ```  

2. **Install Prerequisites**:  
   Ensure you have the following installed:  
   - Docker  
   - Kubernetes CLI (kubectl)  
   - Azure CLI (configured for your Azure subscription)  

3. **Setup Environment**:  
   Follow the configuration guidelines provided in [Deployment Setup](deployment-setup.md). This includes preparing container images, setting up the AKS cluster, and configuring necessary integrations.

4. **Deploy to Azure AKS**:  
   Use the provided Kubernetes YAML files to deploy the application to your Azure AKS environment:  
   ```
   kubectl apply -f deployment/
   ```

---

## References  

- **Machanism Platform**: Learn more about the Machanism modular development platform at **[https://machanism.org](https://machanism.org)**.  
- **Seed Projects**: Explore foundational Seed Projects at **[https://machanism.org/seed-project](https://machanism.org/seed-project)**.  
- **MachaOn Projects**: For more details about MachaOn reference implementations, visit **[https://macha.machanism.org/machaon/](https://macha.machanism.org/machaon/)**.  

---

## License  

This project is licensed under the **MIT License**. For more details, see the [LICENSE](LICENSE) file.  

---

**Note**: Prima MachaOn is intended as an example project and may require customization to align with your specific business requirements or deployment environments. Use it as a starting point to build tailored solutions based on **Machanism libraries** and architectural principles.  