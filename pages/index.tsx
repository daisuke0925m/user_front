import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import HuntModal from '@/components/modal'

import styles from './index.module.css'

const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [recode, setRecode] = useState({})
  console.log(recode)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    fetch(
      'https://2qbewbwhu2.execute-api.ap-northeast-1.amazonaws.com/prod/huntings',
    )
      .then((response) => response.json())
      .then((res) => {
        setData(res.huntings)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  console.log(data)

  return (
    <div>
      <Head>
        <title>Jibie d'Aizu[ジビエデイズ]</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HuntModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        recode={recode}
      />
      {/* あやのはここから下 */}
      <div className={styles.mv}>
        <header>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src="logo.svg" alt="" />
              {/* <p className={styles.tagline}>野生動物のオープンソース</p> */}
            </div>
            <div className={styles.header_btn}>
              <div
                className={styles.signin}
                onClick={() => {
                  alert('こちらの機能は現在実装中です。')
                }}
              >
                <a href="#">ログイン</a>
              </div>
              <div
                className={styles.signup}
                onClick={() => {
                  alert('こちらの機能は現在実装中です。')
                }}
              >
                <a href="#">会員登録</a>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.mv_img}>
          <img src="mv.png" alt="" />
        </div>
      </div>
      <main>
        <section className={styles.animals_01}>
          <div className={styles.animals_box}>
            <h1 className={styles.title}>今すぐ活かせる動物たち</h1>
            <div className={styles.animals_01_glupe}>
              {/* カード */}
              {data
                .filter((v: any) => {
                  return (
                    v.trap_status.value === '捕獲' ||
                    v.trap_status.value === '確認済み'
                  )
                })
                .map((v: any, i) => {
                  return (
                    <div
                      key={i}
                      className={styles.animals_01_cnt}
                      onClick={() => {
                        if (v.trap_status.value === '捕獲') {
                          openModal()
                          setRecode(v)
                        }
                      }}
                    >
                      <div className={styles.animals_01_cnt_group}>
                        <div className={styles.wana}>
                          <img src={getTrapImage(v.trap_type.value)} />
                          <div className={styles.wana_type}>
                            {v.trap_type.value}
                          </div>
                        </div>
                        <div className={styles.animals_01_block}>
                          <div
                            className={
                              v.trap_status.value === '捕獲'
                                ? styles.state_get
                                : styles.state_stay
                            }
                          >
                            {getStatusText(v.trap_status.value)}
                          </div>
                          <div className={styles.get_box}>
                            <div className={styles.get_cnt}>
                              <span className={styles.icon}>
                                <img
                                  src="pets_FILL0_wght400_GRAD0_opsz48.svg"
                                  alt=""
                                />
                              </span>
                              <span>動物の種類：</span>
                              <span className={styles.get_animals}>
                                {v.animal_name.value}
                              </span>
                            </div>
                            <div className={styles.get_cnt}>
                              <span className={styles.icon}>
                                <img
                                  src="history_FILL0_wght400_GRAD0_opsz48.svg"
                                  alt=""
                                />
                              </span>
                              <span>捕獲日時：</span>
                              <span className={styles.get_time}>
                                {toJst(v.caught_at.value)}
                              </span>
                            </div>
                          </div>
                          <ul className={styles.basic}>
                            <li>
                              <span>仕掛け日時：</span>
                              <span>{toJst(v.set_trap_at.value)}</span>
                            </li>
                            <li>
                              <span>場所：</span>
                              <span>{v.location.value}</span>
                            </li>
                            <li>
                              <span>設置者：</span>
                              <span>{v.establisher.value}</span>
                            </li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className={
                          v.trap_status.value === '捕獲'
                            ? styles.detail_btn
                            : styles.detail_btn_desable
                        }
                      >
                        <a href="#">
                          詳細を確認する
                          <img
                            src="play_circle_FILL0_wght400_GRAD0_opsz48.svg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
        <section className={styles.animals_02}>
          <div className={styles.animals_bg}>
            <div className={styles.animals_box}>
              <h1 className={styles.title}>見守り中のワナ</h1>
              <div className={styles.animals_02_block}>
                {data
                  .filter((v: any) => {
                    return (
                      v.trap_status.value === '設置済み' ||
                      v.trap_status.value === '回収済み'
                    )
                  })
                  .map((v: any, i) => {
                    return (
                      <div className={styles.animals_02_box} key={i}>
                        <div className={styles.wana_02}>
                          <img
                            src={getRawTrapImage(v.trap_type.value)}
                            alt=""
                          />
                          <div className={styles.wana_type}>
                            {v.trap_type.value}
                          </div>
                        </div>
                        <div className={styles.animals_02_detail}>
                          <div className={styles.state_yet}>ワナ見守り中</div>
                          <ul className={styles.basic}>
                            <li>
                              <span>仕掛け日時：</span>
                              <span>{toJst(v.set_trap_at.value)}</span>
                            </li>
                            <li>
                              <span>場所：</span>
                              <span>{v.location.value}</span>
                            </li>
                            <li>
                              <span>設置者：</span>
                              <span>{v.establisher.value}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className={styles.footer}>
            <div className={styles.logo}>
              <img src="logo_bottom.svg" alt="" />
              {/* <p className={styles.tagline}>野生動物のオープンソース</p> */}
            </div>
            <div className={styles.copy}>©2022 Miraidoubutsuen.</div>
          </div>
        </footer>
      </main>
      {/* あやのはここから上 */}
    </div>
  )
}

export default Home

const getTrapImage = (trap: string): string => {
  switch (trap) {
    case '落とし穴':
      return 'wana_01.png'
    case '箱罠':
      return 'wana_01.png'
    case 'くくり罠':
      return 'wana_02.png'
    default:
      return ''
  }
}

const getRawTrapImage = (trap: string): string => {
  switch (trap) {
    case '落とし穴':
      return 'nowana_01.png'
    case '箱罠':
      return 'nowana_01.png'
    case 'くくり罠':
      return 'nowana_02.png'
    default:
      return ''
  }
}

const getStatusText = (trap: string): string => {
  switch (trap) {
    case '捕獲':
      return '罠にかかった！'
    case '確認済み':
      return '現在状態確認中'
    default:
      return ''
  }
}

const toJst = (date: string): string => {
  const jst = new Date(date)
  const y = jst.getFullYear()
  const m = jst.getMonth()
  const d = jst.getDate()
  const h = jst.getHours()
  const min = jst.getMinutes()

  return y + '/' + m + '/' + d + ' ' + h + ':' + min
}
