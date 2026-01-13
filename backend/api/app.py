from flask import Flask

app = Flask(__name__)

@app.route('/model_accuracy', methods=['GET'])
def get_model_accuracy():
    # Assuming model accuracies are calculated and stored in a dictionary
    return "95.67"  # Example accuracy value


if __name__ == '__main__':
    app.run(debug=True)

# End of file
