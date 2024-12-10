#!/usr/bin/python3

try:
	from Crypto import Random
	from Crypto.Util.py3compat import bchr
	from Crypto.Cipher import AES
	from Crypto.Protocol.KDF import PBKDF2
	from Crypto.Hash import SHA256
except ImportError:
	print('missing required library: pycrypto (try \"pip3 install pycrypto\")')
	exit(1)
import os, sys
from base64 import b64encode
from getpass import getpass
import codecs
import re

if __name__ == "__main__":
	inputfile = 'secret.html'
	try:
		with open(inputfile, "rb") as f:
			data = f.read()
	except FileNotFoundError:
		print("Cannot open file: %s"%inputfile)
		exit(1)

	if len(sys.argv) > 1:
		passphrase = sys.argv[1]
	else:
		while True:
			passphrase = getpass(prompt='Password: ')
			if passphrase == getpass(prompt='Confirm: '):
				break
			print("Passwords don\'t match, try again.")
	print(f'password: \"{passphrase}\"')
	salt = Random.new().read(32)
	key = PBKDF2(
		passphrase.encode('utf-8'),
		salt,
		count=100000,
		dkLen=32,
		hmac_hash_module=SHA256
	)
	iv = Random.new().read(16)

	cipher = AES.new(key, AES.MODE_GCM, nonce=iv)
	encrypted, tag = cipher.encrypt_and_digest(data)


	encryptedPl = f'{b64encode(salt + iv + encrypted + tag).decode("utf-8")}'
	# with codecs.open("encrypted.pl.bin", 'w','utf-8-sig') as f:
	# 	f.write(encryptedPl)
	outputfile = 'script.js'
	try:
		with open(outputfile, "r+") as f:
			everything = re.sub(
				r'var pl = \"([-A-Za-z0-9+/]*={0,3})\";',
				f'var pl = "{encryptedPl}";',
				f.read()
			)
			f.seek(0, 0)
			f.write(everything)
	except FileNotFoundError:
		print("Cannot open file: ")
	print("Done")
