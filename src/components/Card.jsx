import React, { useState } from 'react'
import data from '../data'

const Card = () => {
  const [places, setPlaces] = useState(data)
  const [expanded, setExpanded] = useState({})

  const handleDelete = (id) => {
    setPlaces(places.filter((p) => p.id !== id))
  }

  const handleRefresh = () => {
    setPlaces(data)
    setExpanded({})
  }

  const truncateText = (text, id) => {
    const limit = 150
    if (expanded[id] || text.length <= limit) return text
    return text.substring(0, limit) + "..."
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center mb-4">
        <h2
          className="text-center mb-4 fw-bold text-primary rounded-pill px-4 py-2 d-inline-block shadow-sm bg-light"
          style={{ border: '3px dashed #0d6efd' }}
        >
          Travel Website
        </h2>
      </div>

       {places.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="fw-bold text-danger mb-3">No Places Left</h4>
          <button className="btn btn-primary px-4 py-2" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      ) : (

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {places.map((p) => (
          <div className="col" key={p.id}>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img
                src={p.image}
                className="card-img-top rounded-top"
                alt={p.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="fw-bold text-success">₹ {p.price}</p>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                  {truncateText(p.info, p.id)}
                  {p.info.length > 150 && (
                    <span
                      className="fw-bold ms-1"
                      style={{
                        color: "gray",
                        cursor: "pointer",
                        fontSize: "17px"
                      }}
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [p.id]: !prev[p.id],
                        }))
                      }
                    >
                      {expanded[p.id] ? "Read less" : "Read More"}
                    </span>
                  )}
                </p>
              </div>
              <div className="card-footer border-0 d-flex justify-content-center">
                <button
                  className="btn btn-outline-light btn-sm bg-danger px-5 py-2"
                  onClick={() => handleDelete(p.id)}>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Card
