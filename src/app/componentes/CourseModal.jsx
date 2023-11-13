import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CourseModal(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    days: [
      { value: "lu", isClicked: true },
      { value: "ma", isClicked: false },
      { value: "mi", isClicked: false },
      { value: "ju", isClicked: false },
      { value: "vi", isClicked: false },
    ],
    time: { start: "", end: "" },
  });

  console.log("form data", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let selectedDays = [];

    formData.days.forEach((element) => {
      if (element.isClicked) {
        selectedDays.push[element.value];
      }
    });

    const postData = {
      name: formData.name,
      teacher: formData.teacher,
      days: selectedDays,
      startDate: formData.time.start,
      endDate: formData.time.end,
    };

    // Fetch options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch("http://localhost:3000/api/postCourse", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully with data:", formData);
        // Handle the data from the server if needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeDays = (e, dayValue) => {
    setFormData((prevData) => ({
      ...prevData,
      days: prevData.days.map((day) =>
        day.value === dayValue ? { ...day, isClicked: e.target.checked } : day
      ),
    }));
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button
        onClick={openModal}
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
      >
        Nuevo Curso
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <b>
          <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Nuevo curso</h1>
        </b>
        <div>Llena el siguiente formulario para registrar un nuevo curso</div>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
          <label className="block mb-4">
            <span className="text-gray-700">Nombre del Curso:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Nombre del docente:</span>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Dias:</span>
            <div className="mt-1 flex space-x-4">
              {formData.days.map((day) => (
                <label key={day.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="days"
                    value={day.value}
                    checked={day.isClicked}
                    onChange={(e) => handleChangeDays(e, day.value)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span>{day.value}</span>
                </label>
              ))}
            </div>
          </label>

          {/* Time */}
          <label className="block mb-4">
            <span className="text-gray-700">Horario:</span>
            <div className="mt-1 flex space-x-4">
              <input
                type="text"
                name="time.start"
                value={formData.time.start}
                onChange={handleChange}
                placeholder="Hora de inicio"
                className="p-2 flex-1 rounded-md border-gray-300"
              />
              <input
                type="text"
                name="time.end"
                value={formData.time.end}
                onChange={handleChange}
                placeholder="Hora de fin"
                className="p-2 flex-1 rounded-md border-gray-300"
              />
            </div>
          </label>

          {/* Similar sections for days, time, attendance, and image_url */}

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
          >
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default CourseModal;
