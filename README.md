# Medicinal Plant Prediction System

This project implements a deep learning-based system to predict 40 different medicinal plants from their images. It utilizes a pre-trained VGG16 model for image classification and provides a web application for easy access to predictions.

## Project Structure

- **plant_prediction.ipynb**: Jupyter Notebook containing the deep learning model implementation and image preprocessing code.
- **plant-prediction.pdf**: A PDF document summarizing the outputs and results of the model, including performance metrics.
- **my_model.h5**: The trained model file saved in HDF5 format, which can be loaded for predictions.
- **app.py**: The main FastAPI application code that serves predictions via an API.
- **Web-App/**: This folder contains the HTML, CSS, and JavaScript files for the web interface.

## Dataset

The model is trained on the [Indian Medicinal Leaves Dataset](https://www.kaggle.com/datasets/aryashah2k/indian-medicinal-leaves-dataset) sourced from Kaggle, featuring images of various medicinal plants.

## Model Architecture

This project utilizes the VGG16 architecture, a well-known convolutional neural network (CNN) model recognized for its effectiveness in image classification tasks.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Python 3.x
- FastAPI
- Uvicorn (for running the FastAPI server)
- TensorFlow/Keras (for model inference)
- Other required libraries (as specified in `requirements.txt`)

### Installation

1. Clone this repository.
2. Install the necessary dependencies.

### Running the Application

1. Start the FastAPI server using Uvicorn.
2. Open your web browser and go to `http://localhost:8000` to run the FastAPI server. Note that the API itself does not have a direct interface.
3. Access the API through the HTML interface in the **Web-App/** folder. The web interface will allow you to upload images and receive predictions.

### Usage

- Upload an image of a medicinal plant through the web interface, and the system will predict its name based on the trained model.
- The predictions and the corresponding confidence levels will be displayed on the web interface.

## Conclusion

This Medicinal Plant Prediction System provides a valuable tool for identifying medicinal plants using deep learning techniques. You can explore the code, modify the model, or enhance the web application as needed.

Feel free to reach out if you have any questions or feedback!

## Acknowledgments

- The dataset is provided by [Kaggle](https://www.kaggle.com/datasets/aryashah2k/indian-medicinal-leaves-dataset).
- Thanks to the contributors of the VGG16 model and all libraries used in this project.

---

This README serves as a comprehensive guide to understanding and using the Medicinal Plant Prediction System. Happy coding!
