import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { screenLoading } from "../..";
import useCreateUser from "../../hooks/useCreateUser";
import useInput from "../../hooks/useInput";

export default function JoinContainer() {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [password1, onPassword1Change] = useInput("");
  const [nickName, onNickNameChange] = useInput("");
  const [description, ondescription] = useInput("");
  const [imgSrc, setImgSrc] = useState(
    "http://ernturkey.com/wp-content/uploads/2017/10/default-user-image.png"
  );

  const [goMain, setGoMain] = useState(false);

  const [createUser] = useCreateUser();

  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const {
        data: {
          data: {
            image: { url },
          },
        },
      } = await axios.post(
        "https://api.imgbb.com/1/upload?key=c7000eb01c5de6dfb420be986c2e6c3e",
        formData
      );
      setImgSrc(url);
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (password !== password1) {
      alert("비밀번호를 확인해주세요 다릅니다.");
      return;
    }
    try {
      screenLoading(true);
      const { data, errors } = await createUser({
        email,
        password,
        nickName,
        avatarImg: imgSrc,
        description,
      });
      if (errors) {
        alert("형식에 맞지 않습니다");
        return;
      }
      if (data?.createUser) {
        const { ok, error } = data.createUser;
        if (ok) {
          alert("회원가입 되었습니다. 로그인을 하실 수 있습니다.");
          setGoMain(true);
        } else {
          alert(error);
        }
      }
    } catch (error) {
      screenLoading(false);
      alert("형식에 맞지 않습니다");
      return;
    }
  };

  if (goMain) {
    return <Redirect to="/" />;
  }

  return (
    <div className="JoinContainer">
      <form onSubmit={onSubmit}>
        <label>이메일</label>
        <input type="email" value={email} onChange={onEmailChange} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordChange} />
        <label>비밀번호 확인</label>
        <input type="password" value={password1} onChange={onPassword1Change} />
        <label>닉네임</label>
        <input type="text" value={nickName} onChange={onNickNameChange} />
        <label>설명</label>
        <input type="text" value={description} onChange={ondescription} />

        <label>프로필 이미지</label>
        <img src={imgSrc} />
        <input type="file" accept="image/*" onChange={onImgChange} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
