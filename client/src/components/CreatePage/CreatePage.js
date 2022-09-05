import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useNavigate } from "react-router-dom"

export const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const handlePress = async event => {
        if (event.key === 'Enter') {//Проверка на нажатие
          try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
              Authorization: `Bearer ${auth.token}`
            })
            navigate(`/detail/${data.link._id}`, { replace: true })
          } catch (e) {}
        }
      }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={handlePress}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
        </div>
    )
}

