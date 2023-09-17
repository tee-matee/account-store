import React from "react";
import { Button, Form, Input } from "antd";
import validator from "validator";
import {
  publicEncrypt,
  constants,
  privateDecrypt,
  createPublicKey,
} from "crypto";
import axios from "axios";
import {
  securingLocalStorage,
  KeySecuringLocalStorage,
  TypeSecuringLocalStorage,
} from "@/core/cryptography";

export default function RegisterForm() {
  const callServiceRegister = async (values: any) => {
    const { email, password } = values;
    const publicKey = securingLocalStorage(
      TypeSecuringLocalStorage.Get,
      KeySecuringLocalStorage.ServerPublicKey,
      ""
    );

    const data = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(JSON.stringify({ email, password }))
    );
    // try {
    //   const data = publicEncrypt(
    //     {
    //       key: process.env.SERVER_PUBLIC_KEY,
    //       padding: constants.RSA_PKCS1_PADDING,
    //       oaepHash: "sha256",
    //     },
    //     Buffer.from(JSON.stringify({ email, password }))
    //   );
    // } catch (err) {
    //   console.log(err);
    // }

    // const buf = Buffer.from(data.toString("base64"), "base64");
    // const x = privateDecrypt(
    //   {
    //     key: "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAu3JuUWAUnk9h2EDlUkzYYXJWdgpJ3isRX6JNczcSwuym0pWD\nQ4JxvhpkdotqoU+oj1Yj7j3TFDkEQu6deFysFCaW/0G1zyrikzS338v7tPTiYYRM\nKFhmJOWiRAGSBg/+eQBwHirqonytQ5rCPC3FXeJ2aJD4d9TsuHK220KaZjSoqodB\nb8E7UOfVfZ1T+MeHh9g8/qZCwGUh/IIKSd6xGFHfmp6TwS4UBRpdNQhhfcPBSmzx\njrk2JEI9F0VZPtJ+xUtrTUzYS5nUj5czc3q2/zrQdp30n9N9VKlnmG0FrwXOXa1j\nHLEVe76vgpZYFMnZoULkiceQxShvh8dhr4YhUwIDAQABAoIBADlGvonUA4jaNcoo\nDkqHG6kvEFdSTn76Bv2DcQoPHob8W/9F202yGsJdeywz7pmq5xUhW6pNLuXjhDdV\nhT2Fh7lCj2og8IaEkqYrejICuP9ywofMrp63YELO/jWsiyuaEIZ1yUyWjYqn8SOS\nst5DmCbXb5oFDj9Diy/TMaeu4tHup+XTYQmzTSM7WLSk6pLE8vRh8L0YpnCluLJQ\njLtOS111wc6NwNSLa49DveZ3jg4Q7ZvG3EP0QTBIVKZ0sUvLHEvQFRaBbzT14F0M\nPCBaMXgohjxRj3jWu+PEWwzsbvTTaqYmRj6RL0XPGL5XsQcw08ItQRGgzXFMObl5\n1oc9EdECgYEA7yN1uPuUq9IAAGKAso1AD7uD53VvAJCBBfu0MULbT4DzIZmBINuL\nN3k96P0ZKGrCLJZp0IBhq/p/u73HcGeB6sysNKIXULcFGUCl/pnI+cutDaC3Cmth\ncsI8RZNNtOfYiS2JbMhGazPsLxyYN3H+0FtxWsE6U2X2pRVdL7TxZvECgYEAyKnr\nchtcggPPwVEdcigEpkThjdqn5TAwfNOQ2YjBMQDqymaL6gzSSAQ8Kdca2nrNu/3D\nBLD9HMQhDewAXtDNeuJXa+sM9TO0fRdQC+cu84i0wLJAOXcQqjihZR46zvTMDpNC\nh4dv9AlEU7NzMIIlODBZHnc612upsFiv0/dttIMCgYBdyMRUZaXqtJL3k6nxXF/x\nS5LxZSbBS+qt1AbZAuVLisDPPopbvn4cpVnYU9pX9XZtUhfxg0fK0JTjpgvfU1iq\nItauVZtbNkuzmZz/+oPNI0mc/JiMZ4xyGybUCm8BMaPEOK2akfi79kL8PvSbWgOa\n5yHPe9RJ/MT7/SLsoMPDoQKBgBZilkhpcv1yDWgkc2N7wWEHCB56CQbRRGd4do09\n60dbMdYYcH1Qptiv2EJWo8FBt9fD7FCGqgXef019SWFKa9HMlDIOy6hC91yJED3z\nsVIrqvZgLDf851gF70NHhwn1Vxo9JUvXOQ8BRaUMvMnpittk0VxLsr27Xfe1PRAp\nZwyfAoGAMF67WcUaI+9mJof1gQdz562fiWG6Dz6OTzPFlFFA6m8purBixmwAG1r3\nlYN2x4Rze0v616T/OFDFejlEETzkYNz+35QSDSwbd+CJ3F8lVgKPQoEc07fVBxQ9\nrZhsha4tvWVCoyOY/xa2uW8lOAjTBn5zyyhw8gSV4srwkXK+r3A=\n-----END RSA PRIVATE KEY-----\n",
    //     padding: constants.RSA_PKCS1_PADDING,
    //     oaepHash: "sha256",
    //   },
    //   buf
    // );
    // console.log("x", x);
    // var temp = x.toString();
    // console.log("temp", temp);
    // const client = data.toString("base64");
    // console.log("client", client);
    // const buf = Buffer.from(client, "base64");
    // console.log("buf", buf);
    // const x = privateDecrypt(
    //   {
    //     key: `-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAjAVNqyEkEUwNkd0b7IO/mhaZ7ifFRJYfHBdVHrIC0MkZuP4p4pUSk5fsznDotiURdXbCxF0ZQOzidmQFtNZYSA9qHFX8IsN/dYwC0wkQ/wSrHPyw2049XoqcJXop0EqBgMd0SnVfbor59x53AaQ7h370J7Sy1yhtTMxqKVwT2SkLUiV1rj4KgNRvvh8DdvullZY3ra+90DNMbv/25rwRD1r5E0Yk1tJ1OegBr/v+cErr1Dt4JjZ2LHqnWzgd9c5JgyAxhD7b40+/35mGE+OWgR66ZHm95g8pUW//qSKuRkzwwqtG9MEUKBd0CdN+UprhFP0XXkfJ8jnXvbCC0ciCRwIDAQABAoIBAAUOxt9hwj6ZCbvHCenKH9hf+y3F62/c9eSbCZk/hku7028XZPuXUejZeBV9IrZYR6dU8e0ZxcyV2tFlLzIHNLlChNYYMM0TjbpAMbvsTb+yOmr5r7O9JSWR7aAYtfVkUAWO/Q2KXfANcE9B5ko9nJ0WnnySPG/BgCKMpUPwMeh04ZLQaYcqTqjcUxrWZzi8JupBdXNmMT/FKuT/fOSSYTS4S3pcHf8YbU6xaV+l0H5aP1rPAbDmL+ECLxKpHzrMVQL6bl27hCAKcyiOHh7Hus+iLR3bCXMognPQgfS/L9EsmbGTKOAg6s5R3Y7BLmKV3AFGmeZZOYvAD964mQgHyx0CgYEAwKv73QlK10+5MUxmXoMQSzhqamdwDxwKmprtxoXSPTXPxsJf6o+Qbj4UG7b+QrgrY7epBo9Q378dceYklNFw1b2JyZoNCg5Pd4/fVAuf8Pot6EgYkqzDxYo6tMK2mbp54m8/SUCPjD2LoVxHborQwqXB+BcdrGyofYNy3Dkx9KUCgYEAugsW9wsKfkcUK6DPUUptiFoXOH/olTFH/Vvrxk9K/5HvrJzk6ltsKKN+rQq8aa0YxLsLNRIWtrK8XsQZsY81MLPrLOHTj1+Io4vCATMZLF6r6fDFJG0FNlX7lowb4wCn4UEPShkyFbAEbnpstCHO/lT+yNSkQpSvEPSQve27a3sCgYBAoXB7VQKl9zhIMTilu5FbqjEIQGp2pxFni1D3pyw/HC32nn1OUZpBYNGd+mSQPPdRG+q3KJwYciOOcYUT5q3TBSGTXvnAxcwib0CbEMs2KrX7lTOpAAsr2JKY0DgwmT0JmAfCqsV8ZajRGANeMXKV2MSYVCjADjL254FAHm+DgQKBgQCOIubau067B2b7phJ+UtS4NcxD2EVDprEPemj5y57K/x4TzJKAEnTh33dqkSc9vYeM1jJLy5Qa5RdRd5UBuR20JeFpGuddRGnKOX5xGC8FXRcO1mpn1/sBdlOOw2CS3+9jAyfBPtqrAx1/onzmamYQnbNCkGMmkx3lYFQtJzHnfQKBgFt80ER8o4sPNufiMt8y4UNFnqY7Wm3sBrMoWFBhcsxuwNY7hLcOhCHac5JqZMcWJzmlr1/rlIBr/nhGIfE6s4GoCOPjRt1smVh6FeXeg2gAzghKHyPTfCRXQQRd+U+Lprk47mna+CsPcr/dOgME9imceapESpS1cHX39O73JT78-----END RSA PRIVATE KEY-----`,
    //     padding: constants.RSA_PKCS1_OAEP_PADDING,
    //     oaepHash: "sha256",
    //   },
    //   Buffer.from(buf)
    // );
    // const test = JSON.parse(x.toString());
    // console.log("test", test);
    // const xxx = data.toString("base64")

    // const res = await axios({
    //   url: `${process.env.HOST_SERVICE}/auth/register`,
    //   method: "post",
    //   data: {
    //     data: data.toString("base64"),
    //     // data: `JNtHDFCxodOiwNNjcv77eP9KowG1+8CpZG/Y8ToizH192xxKMlYaWv72LkIWwkHH836OziI/TQDbWwlwarv9PpxJqhCsT/InS0SfW7foldfZhvpDyfbLPufplsdSbQ11Xikvgx+5lY6GR/+5vNNyh6P1zV5tu66fU1GkS4YBO+K+JXOL8TPxSZV3aZJL6Zn4rZRxlw4wm2RS0LkRs5icd40uXsPZ2tSK9CC1ZHpk0ozaayfIkdhMoScsyuDkfsV5zLIyn06u595FLJ8kdCRbMdm4JGC6ktRaHPdYL9EfkIhRm4sZKBtafp1n94nBwb3rr9AeR/u58MSD5u/FGD2O0Q==`
    //   },
    // });
  };

  const onFinish = (values: any) => {
    callServiceRegister(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="teelnwzaregister"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            validator: (_, value) => {
              if (!validator.isEmail(value)) {
                return Promise.reject("email type");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            validator: (_, value) => {
              if (!validator.isStrongPassword(value)) {
                return Promise.reject("!isStrongPassword");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input.Password placeholder="Ex.Zx123456789!" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your Confirm Password!" },
          {
            validator: (_, value) => {
              if (!validator.isStrongPassword(value)) {
                return Promise.reject("!isStrongPassword");
              } else {
                return Promise.resolve();
              }
            },
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!validator.equals(getFieldValue("password"), value)) {
                return Promise.reject("password not same");
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input.Password placeholder="Ex.Zx123456789!" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
