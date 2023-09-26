'use client'

import React from 'react'
import Sidebar from '@/app/componentes/Sidebar';

import '@/styles/pages/docentes_page.css'

function page() {
    return (
        <div>
<Sidebar/>
      <div className="main-page">
        <div className="table-container">
          {/* Tabla 1 */}
          <table className="table">
            {/* Contenido de la Tabla 1 */}
          </table>
        </div>
        <div className="table-container">
          {/* Tabla 2 */}
          <table className="table">
            {/* Contenido de la Tabla 2 */}
          </table>
        </div>
        <div className="vertical-table">
          {/* Tabla vertical */}
          <table className="table">
            {/* Contenido de la Tabla vertical */}
          </table>
        </div>
      </div>
        </div>
    
    );
}

export default page